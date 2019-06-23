import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGames } from '../../redux/actions/GamesActions';

class GamesComponent extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  showGames = list =>
    list.games
      ? list.games.map((item, i) => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Article', {
                ...item
              })
            }
            key={i}
          >
            <View style={styles.gameContainer}>
              <View style={styles.gamebox}>
                <Image
                  source={{ uri: `${item.awayData.logo}` }}
                  style={{ height: 80, width: 80 }}
                  resizeMode="contain"
                />
                <Text style={styles.teamRecord}>
                  {item.awayData.wins} - {item.awayData.loss}
                </Text>
              </View>
              <View style={styles.gamebox}>
                <Text style={styles.gameTime}>{item.time}</Text>
                <Text>{Moment(item.date).format('d MMMM')}</Text>
              </View>
              <View style={styles.gamebox}>
                <Image
                  source={{ uri: `${item.localData.logo}` }}
                  style={{ height: 80, width: 80 }}
                  resizeMode="contain"
                />
                <Text style={styles.teamRecord}>
                  {item.localData.wins} - {item.localData.loss}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null;

  render() {
    console.log(this.props.Games);
    return (
      <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          {this.showGames(this.props.Games)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2
  },
  gamebox: {
    width: '33.3%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamRecord: {
    fontSize: 12
  },
  gameTime: {
    fontSize: 15
  }
});

function mapStateToProps(state) {
  return {
    Games: state.Games
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGames }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesComponent);
