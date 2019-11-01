<template>
  <Page @loaded="startMyApp">
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
          <SearchBar hint="Search hint"
                     :text="searchPhrase"
                     @submit="onSearchSubmit"
                     style="width: 100%"
          />
        </StackLayout>
      </GridLayout>
    </ActionBar>
    <RadSideDrawer ref="drawer"
                   :drawerContentSize="currentWidth"
                   @drawerOpened="onDrawerOpened()"
                   @drawerClosed="onDrawerClosed()"
    >
      <StackLayout ~drawerContent
                   backgroundColor="gray">
        <Button text="Close!!!!"
                @tap="onDrawerClosed()"/>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label :text="scrollData" />

        <ScrollView @scroll="handleScroll">
          <StackLayout>
            <StackLayout v-for="(item, i) in library"
                         :key="i">
              <GridLayout :height="currentHeight / 2">
                <Carousel height="100%"
                          width="100%">
                  <CarouselItem v-for="(content, i2) in item.attachmentList"
                                :key="i2"
                                backgroundColor="#ababab"
                                verticalAlignment="middle">
                    <GridLayout rows="*, 30"
                                columns="*,30">
                      <!--<VideoPlayer
                        v-if="content.fileName.indexOf('mp4') !== -1"
                        :src="$common.S3_URL(item.id) + content.fileName"
                        ></VideoPlayer>-->
                      <Image
                        v-if="content.fileName.indexOf('mp4') !== -1"
                        :src="$common.S3_URL(item.id, true) + content.thumbnail"
                        stretch="aspectFit"
                        class="thumb"
                        rowSpan="2"
                        colSpan="2"
                      />
                      <Image
                        v-else
                        :src="$common.S3_URL(item.id) + content.fileName"
                        class="thumb"
                        stretch="aspectFit"
                        rowSpan="2"
                        colSpan="2"
                      />
                      <Label
                        v-if="content.fileName.indexOf('mp4') !== -1"
                        class="fa"
                        color="white"
                        row="1"
                        col="1"
                        fontSize="20"
                        backgroundColor="rgba(0,0,0,0.2)"
                        verticalAlignment="center"
                        textAlignment="center"
                        text.decode="&#xf008;"/>
                      <Label
                        v-else
                        class="fa"
                        color="white"
                        row="1"
                        col="1"
                        fontSize="20"
                        backgroundColor="rgba(0,0,0,0.2)"
                        verticalAlignment="center"
                        textAlignment="center"
                        text.decode="&#xf03e;"/>
                    </GridLayout>
                  </CarouselItem>
                </Carousel>
              </GridLayout>


              <!--<ScrollView orientation="horizontal">
                <GridLayout rows="*,40" columns="*,40">
                  <StackLayout orientation="horizontal" rowSpan="2" colSpan="2">
                    <StackLayout v-for="(content, i2) in item.attachmentList" :key="i2">
                      <Image
                        v-if="content.fileName.indexOf('mp4') !== -1"
                        :src="$common.S3_URL(item.id, true) + content.thumbnail"
                        class="thumb"
                        :width="currentWidth"
                        />
                      <Image
                        v-else
                        :src="$common.S3_URL(item.id) + content.fileName"
                        class="thumb"
                        :width="currentWidth"
                      />
                    </StackLayout>
                  </StackLayout>

                  <Label :text="item.attachmentList.length" row="1" col="1" color="white"/>
                </GridLayout>
              </ScrollView>-->

              <StackLayout class="info">
                <Label :text="item.brandName"
                       class="txt-brand"/>
                <Label :text="item.name"
                       class="txt-name"/>
                <WrapLayout>
                  <Label v-for="(tag, i3) in item.tag.split(',')"
                         :text="'#'+tag+' '"
                         :key="i3"
                         class="txt-tags"
                  />
                </WrapLayout>
              </StackLayout>

            </StackLayout>
            <StackLayout>
              <Button text="Load More"/>
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
    </RadSideDrawer>

    <!--<ScrollView>
      <StackLayout rows="auto">
        <StackLayout v-for="(item, i) in library"
                     :key="i">
          <GridLayout :height="currentHeight / 2">
            <Carousel height="100%"
                      width="100%">
              <CarouselItem v-for="(content, i2) in item.attachmentList"
                            :key="i2"
                            backgroundColor="#ababab"
                            verticalAlignment="middle">
                <GridLayout rows="*, 30"
                            columns="*,30">
                  &lt;!&ndash;<VideoPlayer
                    v-if="content.fileName.indexOf('mp4') !== -1"
                    :src="$common.S3_URL(item.id) + content.fileName"
                    ></VideoPlayer>&ndash;&gt;
                  <Image
                    v-if="content.fileName.indexOf('mp4') !== -1"
                    :src="$common.S3_URL(item.id, true) + content.thumbnail"
                    stretch="aspectFit"
                    class="thumb"
                    rowSpan="2"
                    colSpan="2"
                  />
                  <Image
                    v-else
                    :src="$common.S3_URL(item.id) + content.fileName"
                    class="thumb"
                    stretch="aspectFit"
                    rowSpan="2"
                    colSpan="2"
                  />
                  <Label
                    v-if="content.fileName.indexOf('mp4') !== -1"
                    class="fa"
                    color="white"
                    row="1"
                    col="1"
                    fontSize="20"
                    backgroundColor="rgba(0,0,0,0.2)"
                    verticalAlignment="center"
                    textAlignment="center"
                    text.decode="&#xf008;"/>
                  <Label
                    v-else
                    class="fa"
                    color="white"
                    row="1"
                    col="1"
                    fontSize="20"
                    backgroundColor="rgba(0,0,0,0.2)"
                    verticalAlignment="center"
                    textAlignment="center"
                    text.decode="&#xf03e;"/>
                </GridLayout>
              </CarouselItem>
            </Carousel>
          </GridLayout>


          &lt;!&ndash;<ScrollView orientation="horizontal">
            <GridLayout rows="*,40" columns="*,40">
              <StackLayout orientation="horizontal" rowSpan="2" colSpan="2">
                <StackLayout v-for="(content, i2) in item.attachmentList" :key="i2">
                  <Image
                    v-if="content.fileName.indexOf('mp4') !== -1"
                    :src="$common.S3_URL(item.id, true) + content.thumbnail"
                    class="thumb"
                    :width="currentWidth"
                    />
                  <Image
                    v-else
                    :src="$common.S3_URL(item.id) + content.fileName"
                    class="thumb"
                    :width="currentWidth"
                  />
                </StackLayout>
              </StackLayout>

              <Label :text="item.attachmentList.length" row="1" col="1" color="white"/>
            </GridLayout>
          </ScrollView>&ndash;&gt;

          <StackLayout class="info">
            <Label :text="item.brandName"
                   class="txt-brand"/>
            <Label :text="item.name"
                   class="txt-name"/>
            <WrapLayout>
              <Label v-for="(tag, i3) in item.tag.split(',')"
                     :text="'#'+tag+' '"
                     :key="i3"
                     class="txt-tags"
              />
            </WrapLayout>
          </StackLayout>

        </StackLayout>
      </StackLayout>
    </ScrollView>-->
  </Page>
</template>

<script>
  import http from 'axios';
  import {isAndroid, screen, device} from 'tns-core-modules/platform';
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
        scrollData: null
      }
    },
    watch: {},
    methods: {
      onSearchSubmit(args) {
        let searchBar = args.object;
        console.log("You are searching for " + searchBar.text);
      },
      onDrawerClosed() {
        this.drawerToggle = false;
        this.$refs.drawer.closeDrawer();

      },
      onDrawerOpened() {
        this.drawerToggle = true;
        this.$refs.drawer.showDrawer();

      },
      toggleDrawer() {
        this.drawerToggle = !this.drawerToggle;
        this.$refs.drawer.toggleDrawerState();
      },
      startMyApp() {
        http.get('http://clapi.wisebirds.co/board/user/list/?listSize=10&page=0&status=Y')
          .then((res) => {
            this.library = res.data.content;
          })
      },
      handleScroll(args) {
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
