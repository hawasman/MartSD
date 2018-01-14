import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  TouchableOpacity
} from 'react-native';
import { Text, Button, NavigationBar, ListView, Screen, Image, Title, Subtitle, Divider, Card, GridRow  } from '@shoutem/ui';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      restaurants: [{
        "name": "Gaspar Brasserie",
        "address": "185 Sutter St, San Francisco, CA 94109",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Chalk Point Kitchen",
        "address": "527 Broome St, New York, NY 10013",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
      }, {
        "name": "Gaspar Brasserie",
        "address": "185 Sutter St, San Francisco, CA 94109",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
      }],
    }
  }
  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <Image
            styleName="large"
            source={{ uri: rowData[0].image.url }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{rowData[0].name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">{rowData[0].address}</Subtitle>
            </Tile>
          </Image>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((restaurant, id) => {
    return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: restaurant.image.url  }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>{restaurant.address}</Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }
  render() {
      // Group the restaurants into rows with 2 columns, except for the
    // first article. The first article is treated as a featured article
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(this.state.restaurants, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }

      return 1;
    });

    return (
      <Screen style={styles.container}>
        <NavigationBar
          leftComponent={<Icon name="sidebar" />}
          centerComponent={<Title>MartSD</Title>}
          rightComponent={(
            <Button>
              <Icon name="cart" />
            </Button>
          )}
        />
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}
