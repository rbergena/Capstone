import React from 'react';
import { Image } from 'react-native';

// Instruments
export const instruments = [
  {
    id: 'Accordian',
    name: 'Accordian',
  },
  {
    id: 'Cello',
    name: 'Cello',
  },
  {
    id: 'Clarinet',
    name: 'Clarinet',
  },
  {
    id: 'Congas',
    name: 'Congas',
  },
  {
    id: 'Djembe',
    name: 'Djembe',
  }, {
    id: 'Double Bass',
    name: 'Double Bass',
  }, {
    id: 'Drum Set',
    name: 'Drum Set',
  }, {
    id: 'Flute',
    name: 'Flute',
  }, {
    id: 'French Horn',
    name: 'French Horn',
  }, {
    id: 'Guitar',
    name: 'Guitar',
  }, {
    id: 'Harmonica',
    name: 'Harmonica',
  },
  {
   id: 'Harp',
   name: 'Harp',
 },
  {
    id: 'Harpsichord',
    name: 'Harpsichord',
  },
  {
    id: 'Marimba',
    name: 'Marimba',
  },
  {
    id: 'Oboe',
    name: 'Oboe',
  },
  {
    id: 'Organ',
    name: 'Organ',
  },
  {
    id: 'Piano',
    name: 'Piano',
  },
  {
    id: 'Piccolo',
    name: 'Piccolo',
  },
  {
    id: 'Saxophone',
    name: 'Saxophone',
  },
  {
    id: 'Snare Drum',
    name: 'Snare Drum',
  },
  {
    id: 'Steel Pan',
    name: 'Steel Pan',
  },
  {
   id: 'Trombone',
   name: 'Trombone',
  },
  {
    id: 'Trumpet',
    name: 'Trumpet',
  },
  {
    id: 'Tuba',
    name: 'Tuba',
  },
  {
    id: 'Ukulele',
    name: 'Ukulele',
  },
  {
    id: 'Vibraphone',
    name: 'Vibraphone',
  },
  {
    id: 'Viola',
    name: 'Viola',
  },
  {
    id: 'Violin',
    name: 'Violin',
  },
  {
    id: 'Vocals',
    name: 'Vocals',
  },
  {
    id: 'Xylophone',
    name: 'Xylophone',
  },
];

// Genres
export const genres = [{
    genre: 'Blues',
    name: 'Blues',
  }, {
    genre: 'Classical',
    name: 'Classical',
  }, {
    genre: 'Country',
    name: 'Country',
  }, {
    genre: 'Electronic',
    name: 'Electronic',
  }, {
    genre: 'Folk',
    name: 'Folk',
  }, {
    genre: 'Funk',
    name: 'Funk',
  }, {
    genre: 'Hip Hop',
    name: 'Hip Hop',
  }, {
    genre: 'Jazz',
    name: 'Jazz',
  }, {
    genre: 'Latin',
    name: 'Latin',
  }, {
    genre: 'Metal',
    name: 'Metal',
  }, {
    genre: 'Pop',
    name: 'Pop',
  }, {
    genre: 'R&B',
    name: 'R&B',
  }, {
    genre: 'Reggae',
    name: 'Reggae',
  }, {
    genre: 'Rock',
    name: 'Rock',
  }, {
    genre: 'Soul',
    name: 'Soul',
  },
];
// African
// Blues
// Classical
// Country
// Electronic
// Folk
// Funk
// Hip Hop
// Jazz
// Latin
// Metal
// Pop
// R&B
// Reggae
// Rock
// Soul

// export function Icons(instrument) {
//   console.log('in icons')
//   console.log(instrument)
//   if(instrument === 'Djembe') {
//     console.log('in Djembe')
//     return (<Image source={require('../assets/Djembe.png')}
//     style={{width: 25, height: 25, marginRight: 5}}
//     />)
//   } else if(instrument === 'Harmonica')  {
//     return (<Image source={require('../assets/Harmonica.png')}
//     style={{width: 25, height: 25, marginRight: 5}}
//     />)
//   }
// 		// return <img src='https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-octopus.jpg' />;
// }

export const Icons = (props) => {
    let instruments = props.instruments;
    console.log('in icons')
    console.log(instruments)
    result = [];
    instruments.forEach((instrument) => {
      if(instrument === 'Djembe') {
        console.log('in Djembe')
        result.push(<Image source={require('../assets/Djembe.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Harmonica')  {
        result.push(<Image source={require('../assets/Harmonica.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }
    })
      return result




    // // if(instrument === 'Djembe') {
    // //   console.log('in Djembe')
    //   return (<Image source={require('../assets/Djembe.png')}
    //   style={{width: 25, height: 25, marginRight: 5}}
    //   />)
    // } else if(instrument === 'Harmonica')  {
    //   return (<Image source={require('../assets/Harmonica.png')}
    //   style={{width: 25, height: 25, marginRight: 5}}
    //   />)
    // }
    // return (
    //   <div>
    //     <h1>Cute Guinea Pigs</h1>
    //     <img src={src} />
    //   </div>
    // );
}
