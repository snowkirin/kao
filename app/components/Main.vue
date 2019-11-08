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
        </StackLayout>
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer"
                   :drawerContentSize="currentWidth"
                   @drawerOpened="onDrawerOpened"
                   @drawerClosed="onDrawerClosed"
    >
      <StackLayout ~drawerContent
                   backgroundColor="#222222"
                   style="padding-left: 20; padding-right: 20;"
      >
        <ScrollView>
          <StackLayout>
            <StackLayout>
              <StackLayout>
                <Label text="카테고리"
                       style="color: #ffffff;"/>
              </StackLayout>
              <FlexboxLayout flexWrap="wrap"
                             style="margin-left: -12;">
                <FlexboxLayout
                  v-for="(item, idx) in filterList.category"
                  class="filter-item"
                  alignItems="center"
                  :key="idx"
                  style="margin-left: 12; margin-top: 16"
                >
                  <Label
                    :text="item.abbrName"
                    class="btn-name"
                  />
                  <Label :text="item.count"
                         class="btn-count"
                  />
                </FlexboxLayout>

              </FlexboxLayout>
            </StackLayout>
            <StackLayout style="margin-top: 20">
              <StackLayout>
                <Label text="소재유형"
                       style="color: #ffffff;"/>
              </StackLayout>
              <FlexboxLayout flexWrap="wrap"
                             style="margin-left: -12;">
                <FlexboxLayout
                  v-for="(item, idx) in filterList.creativeType"
                  class="filter-item"
                  alignItems="center"
                  :key="idx"
                  style="margin-left: 12; margin-top: 16"
                >
                  <Label
                    :text="item.abbrName"
                    class="btn-name"
                  />
                </FlexboxLayout>
              </FlexboxLayout>
            </StackLayout>
            <FlexboxLayout justifyContent="center">
              <Button text="초기화"
                      class="btn-init"/>
              <Button text="검색"
                      class="btn-submit"/>
            </FlexboxLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
      <StackLayout ~mainContent>
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
        filterList: {
          category: [],
          creativeType: []
        },
        filterSelect: {
          category: [],
          creativeType: []
        }
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
        this.fetchFilter('C').then((res) => {
          this.filterList.category = res;
        });
        this.fetchFilter('T').then((res) => {
          this.filterList.creativeType = res;
        });
      },
      fetchLibrary() {
        return new Promise(resolve => {
          http.get('https://clapi.wisebirds.co/board/user/list/?listSize=10&page=0&status=Y')
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.error(error);
            })
        })
      },
      fetchFilter(type) {
        return new Promise(resolve => {
          http.get(`https://clapi.wisebirds.co/code/count/${type}`)
            .then(({data}) => {
              resolve(data);
            })
            .catch((error) => {
              console.log(error);
            })
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

  .filter-item {
    border-radius: 18;
    background-color: #fff;
    height: 36;
    padding-left: 15;
    padding-right: 15;

    .btn-name {
      font-size: 14;
      color: rgba(51, 51, 51, 1.0);
      font-weight: 700;
    }

    .btn-count {
      color: rgba(51, 51, 51, 0.6);
      font-size: 14;
      margin-left: 5;
    }
  }

  .btn-init {
    width: 156;
    height: 46;
    border-radius: 28;
    border-width: 1;
    border-style: solid;
    border-color: #fff;
    background-color: #000;
    color: #fff;
    font-size: 15;

  }

  .btn-submit {
    width: 156;
    height: 46;
    border-radius: 28;
    background-color: #ff4a01;
    color: #fff;
    font-size: 15;

  }
</style>
