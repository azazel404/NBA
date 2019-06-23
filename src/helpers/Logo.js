import React from 'react';
import { Image } from 'react-native';
import LogoImg from '../../assets/nba_login_logo.png';

const Logo = props => {
  return (
    <Image
      source={LogoImg}
      resizeMode="contain"
      style={{ width: 70, height: 35 }}
    />
  );
};

export default Logo;
