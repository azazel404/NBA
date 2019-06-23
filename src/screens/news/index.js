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
import { fetchNews } from '../../redux/actions/NewsActions';
import moment from 'moment';

class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true
    };
  }

  async componentDidMount() {
    await this.retriveDataNews();
  }

  retriveDataNews = () => {
    this.setState({ isFetching: true });
    this.props.fetchNews();
    this.setState({ isFetching: false });
  };

  render() {
    const { isFetching } = this.state;

    const data = this.props.news.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            //passing data ke detail article / passing data per id
            this.props.navigation.navigate('Article', {
              ...item
            })
          }
        >
          <View>
            <View style={styles.cardContainer}>
              <Image
                style={{ height: 150, justifyContent: 'space-around' }}
                source={{ uri: `${item.image}` }}
                resizeMode="cover"
              />
              <View style={styles.contentCard}>
                <Text style={styles.titleCard}>{item.title}</Text>
                <View style={styles.bottomCard}>
                  <Text style={styles.bottomCardTeam}>{item.team}</Text>
                  <Text style={styles.bottomCardText}>
                    Posted at {moment(item.date).format('d MMMM')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
        {isFetching || this.props.news.length < 0 ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          data
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  titleCard: {
    color: '#232323',
    fontSize: 16,
    padding: 10
  },
  bottomCard: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10
  },
  bottomCardTeam: {
    color: '#828282',
    fontSize: 12
  },
  bottomCardText: {
    color: '#828282',
    fontSize: 12
  }
});
function mapStateToProps(state) {
  return {
    news: state.News.newsData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNews }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsComponent);
