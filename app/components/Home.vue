<template>
  <Page class="ns-light"
        actionBarHidden="true">
    <GridLayout rows="50, *"
                class="layout">
      <StackLayout row="0">
        <Image src="~/images/creative-library-wh@3x.png"
               marginTop="20"/>
      </StackLayout>
      <FlexboxLayout flexDirection="column"
                     justifyContent="center"
                     alignItems="center"
                     row="1">
        <Label text="로그인"
               class="label-login"/>
        <TextField v-model="id"
                   keyboardType="email"
                   hint="이메일을 입력해 주세요."/>
        <TextField v-model="pw"
                   secure="true"
                   hint="비밀번호를 입력해 주세요."/>
        <Button text="로그인"
                class="btn-submit"
                @tap="onButtonTap"/>
      </FlexboxLayout>

    </GridLayout>
  </Page>
</template>

<script>
  import http from 'axios';
  import Main from './Main';

  export default {
    data() {
      return {
        id: "",
        pw: ""
      }
    },
    methods: {
      onButtonTap() {
        this.$navigateTo(Main, {
          animated: true,
          transition: {
            name: 'slideLeft',
            duration: 250,
            curve: 'easeIn'
          }
        });
      }
    },
    computed: {}
  };
</script>

<style scoped
       lang="scss">

  .layout {
    background-image: url('~/images/img@2x.png');
  }

  .label-login {
    color: rgb(255, 255, 255);
    font-size: 24;
    font-weight: 700;
    margin-bottom: 10;
  }

  TextField {
    background-color: #fff;
    font-size: 14;
    margin-bottom: 10;
    padding-left: 10;
    padding-right: 10;
    width: 340;
    height: 46;
  }

  .btn-submit {
    color: rgb(255, 255, 255);
    border-radius: 28;
    background-color: #ff4a01;
    width: 340;
    height: 46;
  }
</style>
