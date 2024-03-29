export const chatAnimation = () => {
  const chatWrapper = document.querySelector(
    "[data-appearance-animation='chat-animation'] .manage__chat-wrapper"
  );

  chatWrapper.style.transition = 'transform .3s';

  const chatItems = [];

  chatWrapper
    .querySelectorAll('.manage__chat-step')
    .forEach((item) => chatItems.push(item));

  const getTranslateY = (array, index) =>
    array.reduce((accumulator, item, indexInner) => {
      return indexInner < index
        ? accumulator + item.height + item.marginTop + item.marginBottom
        : accumulator;
    }, 0);

  const withChatItemsSizesSignature = (chatItemsStyle) => ({
    height: Number(chatItemsStyle.getPropertyValue('height')
      .slice(0, -2)),
    marginBottom: Number(
      chatItemsStyle.getPropertyValue('margin-bottom')
        .slice(0, -2)
    ),
    marginTop: Number(
      chatItemsStyle.getPropertyValue('margin-top')
        .slice(0, -2)
    ),
  });

  let chatItemsStyles = chatItems.map((item) =>
    withChatItemsSizesSignature(window.getComputedStyle(item))
  );

  console.log(chatItemsStyles);
  let chatCount = 1;

  window.addEventListener('resize', ()=>{
    chatItemsStyles = chatItems.map((item) =>
      withChatItemsSizesSignature(window.getComputedStyle(item))
    );
    console.warn(chatItemsStyles);

    chatWrapper.style.transform = `translateY(calc(100% - ${getTranslateY(
      chatItemsStyles,
      chatCount
    )}px))`;
  })

  const chatInterval = setInterval(() => {
    chatWrapper.style.transform = `translateY(calc(100% - ${getTranslateY(
      chatItemsStyles,
      chatCount
    )}px))`;

    chatItems[chatCount - 1] &&
    chatItems[chatCount - 1].classList.add('manage__chat-step_active');
    chatCount < chatItems.length ? chatCount++ : clearInterval(chatInterval);
  }, 400);
};

