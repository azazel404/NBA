import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import moment from 'moment';

class ArticleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatContent = content => {
    const text = content.replace(/<p>/g, '').replace(/<\/p>/g, '');
    return text;
  };

  render() {
    //get data dari passing from index component
    const params = this.props.navigation.state.params;
    console.log(params);

    return (
      <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
        <View>
          <Image
            style={{ height: 250 }}
            source={{ uri: params.image }}
            resizeMode="cover"
          />
          <View style={styles.ArticleContainer}>
            <View>
              <Text style={styles.articleTitle}>{params.title}</Text>
              <Text style={styles.articleData}>
                {params.team} Posted at {moment(params.date).format('d MMMM')}
              </Text>
              <View style={{ marginTop: 30 }}>
                <Text style={styles.articleContent}>
                  {this.formatContent(params.content)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ArticleContainer: {
    padding: 10
  },
  articleTitle: {
    fontSize: 23,
    color: '#323232'
  },
  articleData: {
    fontSize: 12,
    color: '#828282'
  },
  articleContent: {
    fontSize: 14,
    lineHeight: 20
  }
});

export default ArticleComponent;
