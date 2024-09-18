import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

const WithStoryblok = (BaseComponent) => {
  const MyComp = (props) => {
    let newProps = {
      id: props?.blok?._uid,
      ...props?.blok,
      editable: storyblokEditable(props?.blok),
    };

    const keysAsChildren = ['body', 'content', 'gridItems', 'TopBlockComponent', 'buttons'];
    keysAsChildren.forEach((key) => {
      if (Object.keys(newProps).includes(key)) {
        newProps['children'] = props.blok?.[key]?.map((blok) => (
          <StoryblokComponent key={blok?._uid} blok={blok} />
        ));
      }
    });

    return <BaseComponent {...newProps} />;
  };

  MyComp.displayName = 'withStoryblokHOC';
  return MyComp;
};

export default WithStoryblok;
