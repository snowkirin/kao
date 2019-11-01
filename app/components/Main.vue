<template>
  <Page @loaded="init">
    <ActionBar title=""
               class="action-bar"
               backgroundColor="#2AC4F3"
    >
      <GridLayout rows="*,*">
        <GridLayout columns="*,30,30"
                    row="0">
          <StackLayout col="0"
                       horizontalAlignment="left">
            <!-- LOGO -->
            <Label text="LOGO"/>
          </StackLayout>
          <StackLayout col="1">
            <Label text.decode="&#xf023;"
                   class="fas"/>
          </StackLayout>
          <StackLayout @tap="toggleDrawer"
                       col="2"
          >
            <Label text.decode="&#xf0b0;"
                   class="fas"/>
          </StackLayout>
        </GridLayout>
        <StackLayout row="1">
          <!--<SearchBar hint="Search hint"
                     :text="searchPhrase"
                     style="width: 100%"
          />-->
        </StackLayout>
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer"
                   :drawerContentSize="currentWidth"
                   @drawerOpened="onDrawerOpened"
                   @drawerClosed="onDrawerClosed"
    >
      <StackLayout ~drawerContent
                   backgroundColor="gray">

        <Button text="Close!!!!"
                @tap="onDrawerClosed"/>
      </StackLayout>
      <StackLayout ~mainContent>
        <RadListView for="item in library"
                     pullToRefresh="true"
                     @pullToRefreshInitiated="listRefresh"
                     ref="list"
        >
          <v-template>
          </v-template>
          <v-template name="footer">
            <StackLayout>
              <Button text="Load More"/>
            </StackLayout>
          </v-template>
        </RadListView>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import http from 'axios';
  import {isAndroid, screen, device} from 'tns-core-modules/platform';
  import {ObservableArray} from 'tns-core-modules/data/observable-array';
  import {GestureTypes} from 'tns-core-modules/ui/gestures'
  import Sample from "./Sample";


  export default {
    name: "Main",
    components: {Sample},
    data() {
      return {
        searchPhrase: "",
        library: [],
        currentWidth: screen.mainScreen.widthDIPs,
        currentHeight: screen.mainScreen.heightDIPs,
        drawerToggle: false,
        listItem: [
          {
            name: '1',
            desc: 'desc1'
          },
          {
            name: '2',
            desc: 'desc2'
          },
          {
            name: '3',
            desc: 'desc3'
          },
          {
            name: '1',
            desc: 'desc1'
          },
          {
            name: '2',
            desc: 'desc2'
          },
          {
            name: '3',
            desc: 'desc3'
          },
          {
            name: '1',
            desc: 'desc1'
          },
          {
            name: '2',
            desc: 'desc2'
          },
          {
            name: '3',
            desc: 'desc3'
          }
        ]
      }
    },
    watch: {},
    methods: {
      init() {
        // Page가 처음 로딩되었을때 초기값 설정.
        console.log('Loaded');
        http.get('http://clapi.wisebirds.co/board/user/list/?listSize=10&page=0&status=Y')
          .then((res) => {
            this.library = res.data.content;
          })
      },
      // SideBar (여기서는 Filter)
      toggleDrawer() {
        this.drawerToggle = !this.drawerToggle;
        this.$refs.drawer.toggleDrawerState();
      },
      onDrawerClosed() {
        this.drawerToggle = false;
        this.$refs.drawer.closeDrawer();

      },
      onDrawerOpened() {
        this.drawerToggle = true;
        this.$refs.drawer.showDrawer();
      },
      // ActionBar
      onSearchSubmit(args) {
        let searchBar = args.object;
        console.log("You are searching for " + searchBar.text);
      },

      listRefresh(args) {
        const listView = args.object;
        // 여기에 Refresh 될때 일어날 코드 쓰기

        // Refresh END
        listView.notifyPullToRefreshFinished();
      }
    }
  }
</script>

<style scoped
       lang="scss">
  ActionBar {
    padding-left: 20;
    padding-right: 20;
    padding-bottom: 15;
  }

  .info {
    padding: 20;
  }

  .action-bar {
    padding: 0;
  }

  .txt-brand {
    font-size: 13;
  }

  .txt-name {
    font-size: 20;
    font-weight: 700;
  }

  .txt-tags {
    font-size: 12;
    color: #666666;
  }
</style>
