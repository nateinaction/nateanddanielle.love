import React from 'react';
import '../styles/components/Header.css'

const divStyle = {
  height: '30rem',
  backgroundImage: 'url(https://nateanddanielle.love/wp-content/uploads/2017/08/IMG_7765-poke.jpg)',
};

const Header = (props) => {
  return (
    <div className={'header'} style={divStyle} />
  )
}

/*
<img
  src={'https://nateanddanielle.love/wp-content/uploads/2017/08/IMG_7765-poke.jpg'}
  alt={'this is a header image'} />
*/

export default Header;
