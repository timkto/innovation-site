export const TopicInitiative: { [key: string]: { id: string; name: string } } = {
  SPRINGBOARD: {
    id: '4d8ca19a-4436-4140-804b-cb05adf858cc',
    name: 'Springboard',
  },
  SPRINGBOARDX: {
    id: '36ff22fb-0f11-4704-abbe-675a2fedcb53',
    name: 'SpringboardX',
  },
};

export const getTopicInitiativeById = (id: number) => {
  return TopicInitiative[Object.keys(TopicInitiative)[id]];
};
