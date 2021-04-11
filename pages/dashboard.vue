<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      
    </v-container>
  </div>
</template>

<script>
  import API from '@/api';
  import EChart from '@/components/chart/echart';
  import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
  import PostListCard from '@/components/widgets/card/PostListCard';
  import ProfileCard from '@/components/widgets/card/ProfileCard';
  import PostSingleCard from '@/components/widgets/card/PostSingleCard';
  import WeatherCard from '@/components/widgets/card/WeatherCard';
  import PlainTable from '@/components/widgets/list/PlainTable';
  import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
  import VWidget from '@/components/VWidget';
  import Material from 'vuetify/es5/util/colors';
  import VCircle from '@/components/circle/VCircle';
  import BoxChart from '@/components/widgets/chart/BoxChart';
  import ChatWindow from '@/components/chat/ChatWindow';
  import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
  import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';

  export default {
    layout: 'dashboard',
    components: {
      VWidget,
      MiniStatistic,
      ChatWindow,
      VCircle,
      WeatherCard,
      PostSingleCard,
      PostListCard,
      ProfileCard,
      EChart,
      BoxChart,
      CircleStatistic,
      LinearStatistic,
      PlainTable,
      PlainTableOrder
    },
    data: () => ({
      
    }),
    computed: {
      activity () {
        return API.getActivity();
      },
      posts () {
        return API.getPost(3);
      },
      siteTrafficData () {
        return API.getMonthVisit;
      },
      locationData () {
        return API.getLocation;
      }
    },
  };
</script>
