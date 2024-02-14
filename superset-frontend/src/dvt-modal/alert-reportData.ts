import { t } from '@superset-ui/core';

interface TimezoneDataProps {
  label: string;
  value: string;
}

interface Data {
  name: string;
  data: any[];
}

const DvtTimezoneData: TimezoneDataProps[] = [
  {
    label: t('GMT +01:00 (Central European Time)'),
    value: t('Europe/Andorra'),
  },
  { label: t('GMT +04:00 (Asia/Dubai)'), value: t('Asia/Dubai') },
  { label: t('GMT +04:00 (Asia/Dubai)'), value: t('Asia/Dubai') },
  { label: t('GMT +04:30 (Asia/Kabul)'), value: t('Asia/Kabul') },
  { label: t('GMT +04:30 (Asia/Kabul)'), value: t('Asia/Kabul') },
  { label: t('GMT -04:00 (America/Antigua)'), value: t('America/Antigua') },
  { label: t('GMT +01:00 (Africa/Lagos)'), value: t('Africa/Lagos') },
  { label: t('GMT +11:00 (Antarctica/Casey)'), value: t('Antarctica/Casey') },
  { label: t('GMT +07:00 (Antarctica/Davis)'), value: t('Antarctica/Davis') },
  {
    label: t('GMT +10:00 (Antarctica/DumontDUrville)'),
    value: t('Antarctica/DumontDUrville'),
  },
  { label: t('GMT +05:00 (Antarctica/Mawson)'), value: t('Antarctica/Mawson') },
  {
    label: t('GMT +13:00 (Antarctica/McMurdo)'),
    value: t('Antarctica/McMurdo'),
  },
  { label: t('GMT -03:00 (Antarctica/Palmer)'), value: t('Antarctica/Palmer') },
  { label: t('GMT +03:00 (Antarctica/Syowa)'), value: t('Antarctica/Syowa') },
  { label: t('GMT +00:00 (Antarctica/Troll)'), value: t('Antarctica/Troll') },
  { label: t('GMT +06:00 (Antarctica/Vostok)'), value: t('Antarctica/Vostok') },
  { label: t('GMT -11:00 (Pacific/Pago_Pago)'), value: t('Pacific/Pago_Pago') },
  {
    label: t('GMT +11:00 (Antarctica/Macquarie)'),
    value: t('Antarctica/Macquarie'),
  },
  {
    label: t('GMT +10:30 (Australia/Adelaide)'),
    value: t('Australia/Adelaide'),
  },
  { label: t('GMT +09:30 (Australia/Darwin)'), value: t('Australia/Darwin') },
  { label: t('GMT +08:45 (Australia/Eucla)'), value: t('Australia/Eucla') },
  {
    label: t('GMT +11:00 (Australia/Lord_Howe)'),
    value: t('Australia/Lord_Howe'),
  },
  { label: t('GMT +08:00 (Australia/Perth)'), value: t('Australia/Perth') },
  { label: t('GMT +02:00 (Europe/Helsinki)'), value: t('Europe/Helsinki') },
  { label: t('GMT +00:00 (GMT Standard Time)'), value: t('Africa/Abidjan') },
  { label: t('GMT +02:00 (Africa/Bujumbura)'), value: t('Africa/Bujumbura') },
  { label: t('GMT -04:00 (Atlantic/Bermuda)'), value: t('Atlantic/Bermuda') },
  { label: t('GMT -05:00 (America/Eirunepe)'), value: t('America/Eirunepe') },
  { label: t('GMT -02:00 (America/Noronha)'), value: t('America/Noronha') },
  {
    label: t('GMT -05:00 (Eastern Standard Time)'),
    value: t('America/Nassau'),
  },
  { label: t('GMT -06:00 (America/Belize)'), value: t('America/Belize') },
  {
    label: t('GMT -07:00 (Mountain Standard Time)'),
    value: t('America/Cambridge_Bay'),
  },
  {
    label: t('GMT -07:00 (Mountain Standard Time - Phoenix)'),
    value: t('America/Creston'),
  },
  {
    label: t('GMT -06:00 (Central Standard Time)'),
    value: t('America/Rainy_River'),
  },
  { label: t('GMT -03:30 (America/St_Johns)'), value: t('America/St_Johns') },
  {
    label: t('GMT -08:00 (Pacific Standard Time)'),
    value: t('America/Vancouver'),
  },
  { label: t('GMT +06:30 (Asia/Yangon)'), value: t('Asia/Yangon') },
  {
    label: t('GMT -10:00 (Hawaii Standard Time)'),
    value: t('Pacific/Rarotonga'),
  },
  { label: t('GMT -03:00 (America/Santiago)'), value: t('America/Santiago') },
  { label: t('GMT -05:00 (Pacific/Easter)'), value: t('Pacific/Easter') },
  {
    label: t('GMT -01:00 (Atlantic/Cape_Verde)'),
    value: t('Atlantic/Cape_Verde'),
  },
  {
    label: t('GMT +00:00 (GMT Standard Time - London)'),
    value: t('Atlantic/Canary'),
  },
  { label: t('GMT +12:00 (Pacific/Fiji)'), value: t('Pacific/Fiji') },
  { label: t('GMT -03:00 (America/Nuuk)'), value: t('America/Nuuk') },
  {
    label: t('GMT -01:00 (America/Scoresbysund)'),
    value: t('America/Scoresbysund'),
  },
  { label: t('GMT +09:00 (Asia/Jayapura)'), value: t('Asia/Jayapura') },
  { label: t('GMT +05:30 (Asia/Kolkata)'), value: t('Asia/Kolkata') },
  { label: t('GMT +03:30 (Asia/Tehran)'), value: t('Asia/Tehran') },
  { label: t('GMT +13:00 (Pacific/Kanton)'), value: t('Pacific/Kanton') },
  {
    label: t('GMT +14:00 (Pacific/Kiritimati)'),
    value: t('Pacific/Kiritimati'),
  },
  { label: t('GMT +12:00 (Pacific/Norfolk)'), value: t('Pacific/Norfolk') },
  { label: t('GMT +05:45 (Asia/Kathmandu)'), value: t('Asia/Kathmandu') },
  { label: t('GMT +13:45 (Pacific/Chatham)'), value: t('Pacific/Chatham') },
  { label: t('GMT -09:00 (Pacific/Gambier)'), value: t('Pacific/Gambier') },
  { label: t('GMT -09:30 (Pacific/Marquesas)'), value: t('Pacific/Marquesas') },
  { label: t('GMT -08:00 (Pacific/Pitcairn)'), value: t('Pacific/Pitcairn') },
  { label: t('GMT -10:00 (America/Adak)'), value: t('America/Adak') },
  {
    label: t('GMT -09:00 (Alaska Standard Time)'),
    value: t('America/Anchorage'),
  },
  { label: t('GMT +13:00 (Pacific/Apia)'), value: t('Pacific/Apia') },
];

const DvtAlertReportData: Data[] = [
  {
    name: 'condition',
    data: [
      {
        label: t('< (Smaller than)'),
        value: '<',
      },
      {
        label: t('> (Larger than)'),
        value: '>',
      },
      {
        label: t('<= (Smaller or equal)'),
        value: '<=',
      },
      {
        label: t('>= (Larger or equal)'),
        value: '>=',
      },
      {
        label: t('== (Is equal)'),
        value: '==',
      },
      {
        label: t('!= (Is not equal)'),
        value: '!=',
      },
      {
        label: t('Not null'),
        value: 'not null',
      },
    ],
  },
  {
    name: 'time',
    data: [
      { value: 'year', label: 'Year' },
      { value: 'month', label: 'Month' },
      { value: 'week', label: 'Week' },
      { value: 'day', label: 'Day' },
      { value: 'hour', label: 'Hour' },
      { value: 'minute', label: 'Minute' },
    ],
  },
  {
    name: 'month',
    data: [
      {
        label: t('January'),
        value: 'january',
      },
      {
        label: t('February'),
        value: 'February',
      },
      {
        label: t('March'),
        value: 'March',
      },
      {
        label: t('April'),
        value: 'April',
      },
      {
        label: t('May'),
        value: 'May',
      },
      {
        label: t('June'),
        value: 'June',
      },
      {
        label: t('July'),
        value: 'July',
      },
      {
        label: t('August'),
        value: 'August',
      },
      {
        label: t('September'),
        value: 'September',
      },
      {
        label: t('October'),
        value: 'October',
      },
      {
        label: t('November'),
        value: 'November',
      },
      {
        label: t('December'),
        value: 'December',
      },
    ],
  },
  {
    name: 'day',
    data: [
      {
        label: t('Sunday'),
        value: 'Sunday',
      },
      {
        label: t('Monday'),
        value: 'Monday',
      },
      {
        label: t('Tuesday'),
        value: 'Tuesday',
      },
      {
        label: t('Wednesday'),
        value: 'Wednesday',
      },
      {
        label: t('Thursday'),
        value: 'Thursday',
      },
      {
        label: t('Friday'),
        value: 'Friday',
      },
      {
        label: t('Saturday'),
        value: 'Saturday',
      },
    ],
  },
  {
    name: 'scheduleSettings',
    data: [
      {
        label: t('None'),
        value: 1,
      },
      {
        label: t('30 days'),
        value: 30,
      },
      {
        label: t('60 days'),
        value: 60,
      },
      {
        label: t('90 days'),
        value: 90,
      },
    ],
  },
  {
    name: 'pngOrSvg',
    data: [
      { label: t('Send as PNG'), value: 'PNG' },
      { label: t('Send as SVG'), value: 'SVG' },
    ],
  },
  {
    name: 'everyOrCron',
    data: [
      { label: t('Every'), value: 'Every' },
      { label: t('Cron'), value: 'Cron' },
    ],
  },
  {
    name: 'chartOrDashboard',
    data: [
      { label: t('Chart'), value: 'Chart' },
      { label: t('Dashboard'), value: 'Dashboard' },
    ],
  },
];

export { DvtTimezoneData, DvtAlertReportData };
