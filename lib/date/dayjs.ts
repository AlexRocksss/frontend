// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/ru';
import 'dayjs/locale/th';
import 'dayjs/locale/id';
import 'dayjs/locale/ms';
import 'dayjs/locale/vi';

import { nbsp } from 'toolkit/utils/htmlEntities';

const relativeTimeConfig = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 6, d: 'day' },
    { l: 'w', r: 1 },
    { l: 'ww', r: 4, d: 'week' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 17 },
    { l: 'yy', d: 'year' },
  ],
};

dayjs.extend(relativeTime, relativeTimeConfig);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);
dayjs.extend(utc);

dayjs.updateLocale('en', {
  formats: {
    llll: `MMM DD YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'MMM D, YYYY H:mm',
  },
  relativeTime: {
    s: '1s',
    ss: '%ds',
    future: 'in %s',
    past: '%s ago',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

dayjs.updateLocale('zh-tw', {
  formats: {
    llll: `YYYY年MM月DD日 HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'YYYY年M月D日 H:mm',
  },
  relativeTime: {
    s: '1秒',
    ss: '%d秒',
    future: '%s後',
    past: '%s前',
    m: '1分',
    mm: '%d分',
    h: '1小時',
    hh: '%d小時',
    d: '1天',
    dd: '%d天',
    w: '1週',
    ww: '%d週',
    M: '1個月',
    MM: '%d個月',
    y: '1年',
    yy: '%d年',
  },
});

dayjs.updateLocale('ja', {
  formats: {
    llll: `YYYY年MM月DD日 HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'YYYY年M月D日 H:mm',
  },
  relativeTime: {
    s: '1秒', ss: '%d秒', future: '%s後', past: '%s前',
    m: '1分', mm: '%d分', h: '1時間', hh: '%d時間',
    d: '1日', dd: '%d日', w: '1週間', ww: '%d週間',
    M: '1ヶ月', MM: '%dヶ月', y: '1年', yy: '%d年',
  },
});

dayjs.updateLocale('ko', {
  formats: {
    llll: `YYYY년 MM월 DD일 HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'YYYY년 M월 D일 H:mm',
  },
  relativeTime: {
    s: '1초', ss: '%d초', future: '%s 후', past: '%s 전',
    m: '1분', mm: '%d분', h: '1시간', hh: '%d시간',
    d: '1일', dd: '%d일', w: '1주', ww: '%d주',
    M: '1개월', MM: '%d개월', y: '1년', yy: '%d년',
  },
});

// cspell:disable
dayjs.updateLocale('ru', {
  formats: {
    llll: `DD.MM.YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'D MMM YYYY H:mm',
  },
  relativeTime: {
    s: '1с', ss: '%dс', future: 'через %s', past: '%s назад',
    m: '1м', mm: '%dм', h: '1ч', hh: '%dч',
    d: '1д', dd: '%dд', w: '1н', ww: '%dн',
    M: '1мес', MM: '%dмес', y: '1г', yy: '%dл',
  },
});

dayjs.updateLocale('th', {
  formats: {
    llll: `DD/MM/YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'D MMM YYYY H:mm',
  },
  relativeTime: {
    s: '1 วิ', ss: '%d วิ', future: 'ใน %s', past: '%s ที่แล้ว',
    m: '1 นาที', mm: '%d นาที', h: '1 ชม.', hh: '%d ชม.',
    d: '1 วัน', dd: '%d วัน', w: '1 สัปดาห์', ww: '%d สัปดาห์',
    M: '1 เดือน', MM: '%d เดือน', y: '1 ปี', yy: '%d ปี',
  },
});

dayjs.updateLocale('id', {
  formats: {
    llll: `DD/MM/YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'D MMM YYYY H:mm',
  },
  relativeTime: {
    s: '1d', ss: '%dd', future: 'dalam %s', past: '%s lalu',
    m: '1m', mm: '%dm', h: '1j', hh: '%dj',
    d: '1h', dd: '%dh', w: '1mg', ww: '%dmg',
    M: '1bl', MM: '%dbl', y: '1th', yy: '%dth',
  },
});

dayjs.updateLocale('ms', {
  formats: {
    llll: `DD/MM/YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'D MMM YYYY H:mm',
  },
  relativeTime: {
    s: '1s', ss: '%ds', future: 'dalam %s', past: '%s lalu',
    m: '1min', mm: '%dmin', h: '1j', hh: '%dj',
    d: '1h', dd: '%dh', w: '1mg', ww: '%dmg',
    M: '1bln', MM: '%dbln', y: '1thn', yy: '%dthn',
  },
});

dayjs.updateLocale('vi', {
  formats: {
    llll: `DD/MM/YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'D MMM YYYY H:mm',
  },
  relativeTime: {
    s: '1 giây', ss: '%d giây', future: 'trong %s', past: '%s trước',
    m: '1 phút', mm: '%d phút', h: '1 giờ', hh: '%d giờ',
    d: '1 ngày', dd: '%d ngày', w: '1 tuần', ww: '%d tuần',
    M: '1 tháng', MM: '%d tháng', y: '1 năm', yy: '%d năm',
  },
});

// cspell:enable

dayjs.locale('en');

export default dayjs;

export const FORMATS = {
  // the "lll" format with seconds
  lll_s: 'MMM D, YYYY H:mm:ss',
};
