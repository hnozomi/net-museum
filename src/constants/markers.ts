type Marker_Type = {
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

export const MARKERS: Marker_Type[] = [
  {
    id: 1,
    name: 'アメリカの装飾芸術',
    position: { lat: 34.70890628770919, lng: 135.52586948808704 },
  },
  {
    id: 4,
    name: '武器と防具',
    position: { lat: 34.70377752646941, lng: 135.51086019487235 },
  },
  {
    id: 5,
    name: 'アフリカ、オセアニア、アメリカの芸術',
    position: { lat: 34.70328550537374, lng: 135.49771790112666 },
  },
  {
    id: 6,
    name: 'アジアの芸術',
    position: { lat: 34.704186205313, lng: 135.49637874961 },
  },
  // {// データが2つしかないため使用しなくていいかも
  //   id: 7,
  //   name: '修道院',
  //   position: { lat: 34.70860006088206, lng: 135.5304199625706 },
  // },
  {
    id: 8,
    name: '衣装、装束',
    position: { lat: 34.701428466456946, lng: 135.49827728161137 },
  },
  {
    id: 9,
    name: 'デッサン、版画',
    position: { lat: 34.7107532752978, lng: 135.51074817143277 },
  },
  {
    id: 10,
    name: 'エジプトの芸術',
    position: { lat: 34.699539729115585, lng: 135.49560393990882 },
  },
  {
    id: 11,
    name: 'ヨーロッパの絵画',
    position: { lat: 34.70236343377001, lng: 135.4958096495181 },
  },
  {
    id: 12,
    name: 'ヨーロッパの彫刻と装飾芸術',
    position: { lat: 34.70610319741984, lng: 135.49843821413566 },
  },
  {
    id: 15,
    name: 'ロバート・リーマン・コレクション',
    position: { lat: 34.70698483048258, lng: 135.5054039535769 },
  },
  // { //データが1つしかないため使用しなくていいかも
  //   id: 16,
  //   name: '図書館',
  //   position: { lat: 34.70860006088206, lng: 135.5304199625706 },
  // },

  {
    id: 17,
    name: '中世の美術',
    position: { lat: 34.69225904290147, lng: 135.50099353279586 },
  },
  // { //データが2つしかないため使用しなくていいかも
  //   id: 18,
  //   name: '楽器',
  //   position: { lat: 34.70860006088206, lng: 135.5304199625706 },
  // },

  {
    id: 19,
    name: '写真',
    position: { lat: 34.68206625364064, lng: 135.51725129295926 },
  },
];
