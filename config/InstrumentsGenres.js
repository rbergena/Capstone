import React from 'react';
import { Image } from 'react-native';

// Instruments
export const instruments = [
  {
    id: 'Accordian',
    name: 'Accordian',
  },
  {
    id: 'Banjo',
    name: 'Banjo',
  },
  {
     id: 'Bongos',
     name: 'Bongos',
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
    id: 'Electric Guitar',
    name: 'Electric Guitar',
  },{
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
    id: 'Mandolin',
    name: 'Mandolin',
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
    id: 'Pan Flute',
    name: 'Pan Flute',
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
   id: 'Tambourine',
   name: 'Tambourine',
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
    id: 'Triangle',
    name: 'Triangle',
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

export const Icons = (props) => {
    let instruments = props.instruments;

    result = [];
    instruments.forEach((instrument) => {
      if(instrument === 'Djembe') {
        result.push(<Image key={instrument} source={require('../assets/Djembe.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Harmonica')  {
        result.push(<Image key={instrument} source={require('../assets/Harmonica.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Xylophone' || instrument === 'Marimba')  {
        result.push(<Image key={instrument} source={require('../assets/Xylophone.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Triangle')  {
        result.push(<Image key={instrument} source={require('../assets/Triangle.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Pan Flute') {
        result.push(<Image key={instrument} source={require('../assets/PanFlute.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Saxophone') {
        result.push(<Image key={instrument} source={require('../assets/Saxophone.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Vocals') {
        result.push(<Image key={instrument} source={require('../assets/Vocals.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Accordian') {
        result.push(<Image key={instrument} source={require('../assets/Accordian.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Banjo') {
        result.push(<Image key={instrument} source={require('../assets/Banjo.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Harp') {
        result.push(<Image key={instrument} source={require('../assets/Harp.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Guitar' || instrument === 'Ukulele') {
        result.push(<Image key={instrument} source={require('../assets/Guitar.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Drum Set') {
        result.push(<Image key={instrument} source={require('../assets/DrumSet.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Bongos') {
        result.push(<Image key={instrument} source={require('../assets/Bongos.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'French Horn') {
        result.push(<Image key={instrument} source={require('../assets/FrenchHorn.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Snare Drum') {
        result.push(<Image key={instrument} source={require('../assets/SnareDrum.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Violin' || instrument === 'Viola') {
        result.push(<Image key={instrument} source={require('../assets/Violin.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Cello' || instrument === 'Double Bass') {
        result.push(<Image key={instrument} source={require('../assets/Cello.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Tambourine') {
        result.push(<Image key={instrument} source={require('../assets/Tambourine.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Trumpet') {
        result.push(<Image key={instrument} source={require('../assets/Trumpet.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }  else if(instrument === 'Mandolin') {
        result.push(<Image key={instrument} source={require('../assets/Mandolin.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Piano' || instrument === 'Harpsichord' || instrument === 'Organ') {
        result.push(<Image key={instrument} source={require('../assets/Piano.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Flute') {
        result.push(<Image key={instrument} source={require('../assets/Flute.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      } else if(instrument === 'Electric Guitar') {
        result.push(<Image key={instrument} source={require('../assets/ElectricGuitar.png')}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }
      else {
        result.push(<Image key={instrument} source={require(`../assets/note3.png`)}
        style={{width: 25, height: 25, marginRight: 5}}
        />)
      }
    })
  return result
}
