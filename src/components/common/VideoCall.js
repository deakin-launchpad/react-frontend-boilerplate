import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button, Grid, CardMedia } from '@mui/material';
import Video from 'twilio-video';
import { APIKeys } from 'constants/index';


const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField id="userName"
              value={username}
              onChange={handleUsernameChange}
              required
              label="Name" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField id="roomName"
              value={roomName}
              onChange={handleRoomNameChange}
              required
              label="Room" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="outlined" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>

  );
};
Lobby.propTypes = {
  username: PropTypes.string,
  handleUsernameChange: PropTypes.func,
  roomName: PropTypes.string,
  handleRoomNameChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });
  }, [roomName, token]);

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2>Room: {roomName}</h2>
        </Grid>
        <Grid item xs={12}>
          {room && <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />}
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => {
            handleLogout(room);
          }}>Log out</Button>
        </Grid>
        <Grid item xs={12}>
          {remoteParticipants}
        </Grid>
      </Grid>
    </Container >
  );
};

Room.propTypes = {
  roomName: PropTypes.string,
  token: PropTypes.string,
  handleLogout: PropTypes.func,
};

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);


  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);


  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);


  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const videoRef = useRef();
  const audioRef = useRef();

  return (
    <Container>
      <h3>{participant.identity}</h3>
      <CardMedia style={{ borderRadius: '5px' }} component="video" ref={videoRef} autoPlay={true} />
      <CardMedia component="audio" ref={audioRef} autoPlay={true} muted={false} />
    </Container>
  );
};
Participant.propTypes = {
  participant: PropTypes.object
};


export const VideoCall = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [myTwilioCallToken, setToken] = useState(null);
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleLogout = useCallback((room) => {
    setToken(undefined);
    room.disconnect();
  }, []);

  const generateTwilioAccessToken = (twilioDetails, userName, roomName) => {
    var AccessToken = require('twilio').jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;
    // Substitute your Twilio AccountSid and ApiKey details
    var ACCOUNT_SID = twilioDetails.twilioAccountSID;
    var API_KEY_SID = twilioDetails.twilioAPIkey;
    var API_KEY_SECRET = twilioDetails.twilioAPIsecret;
    // Create an Access Token
    var accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET
    );
    // Set the Identity of this token
    accessToken.identity = userName;
    // Grant access to Video
    var grant = new VideoGrant();
    grant.room = roomName;
    accessToken.addGrant(grant);
    // Serialize the token as a JWT
    return accessToken.toJwt();
  };
  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    setToken(generateTwilioAccessToken(APIKeys.twilio, username, roomName));
  }, [username, roomName]);
  let render;
  if (myTwilioCallToken) {
    render = (
      <Room roomName={roomName} token={myTwilioCallToken} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};


