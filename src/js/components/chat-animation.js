export const chatAnimation = () => {
  const chatWrapper = document.querySelector(".chat-animation");

  chatWrapper.style.transition = ".3s";

  const chatItems = [];

  chatWrapper
    .querySelectorAll(".manage__chat-step")
    .forEach((item) => chatItems.push(item));

  const getTranslateY = (array, index) =>
    array.reduce((accumulator, item, indexInner) => {
      return indexInner < index
        ? accumulator + item.height + item.marginTop + item.marginBottom
        : accumulator;
    }, 0);

  const withChatItemsSizesSignature = (chatItemsStyle) => ({
    height: Number(chatItemsStyle.getPropertyValue("height").slice(0, -2)),
    marginBottom: Number(
      chatItemsStyle.getPropertyValue("margin-bottom").slice(0, -2)
    ),
    marginTop: Number(
      chatItemsStyle.getPropertyValue("margin-top").slice(0, -2)
    ),
  });

  const chatItemsStyles = chatItems.map((item) =>
    withChatItemsSizesSignature(window.getComputedStyle(item))
  );

  let chatCount = 1;
  const chatInterval = setInterval(() => {
    chatWrapper.style.transform = `translateY(calc(100% - ${getTranslateY(
      chatItemsStyles,
      chatCount
    )}px))`;

    chatItems[chatCount - 1] &&
      chatItems[chatCount - 1].classList.add("manage__chat-step_active");
    chatCount < chatItems.length ? chatCount++ : clearInterval(chatInterval);
  }, 600);
};
