<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex v-for="card in cards" :key="card.title" xs12 sm12 md4 lg4 xl4>
        <v-card elevation="3">
          <v-toolbar dense card color="primary">
            <v-toolbar-title>{{ card.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat icon color="accent">
              <v-icon>check_box</v-icon>
            </v-btn>
            <v-btn flat icon color="accent">
              <v-icon>check_box_outline_blank</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list subheader two-line>
            <v-subheader>Hangout notifications</v-subheader>

            <v-list-tile>
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Notifications</v-list-tile-title>
                <v-list-tile-sub-title
                  >Allow notifications</v-list-tile-sub-title
                >
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Sound</v-list-tile-title>
                <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Video sounds</v-list-tile-title>
                <v-list-tile-sub-title
                  >Hangouts video call</v-list-tile-sub-title
                >
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Invites</v-list-tile-title>
                <v-list-tile-sub-title
                  >Notify when receiving invites</v-list-tile-sub-title
                >
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Calculators',
          text: 'Card 1'
        },
        {
          title: 'Inputs',
          text: 'Card 2'
        },
        {
          title: 'Results',
          text: 'Card 3'
        }
      ],
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right'
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right'
        }
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738'
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738'
        },
        {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142'
        },
        {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735'
        },
        {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542'
        }
      ]
    }
  }
}
</script>
