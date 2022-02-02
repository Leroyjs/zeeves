import { chatAnimation } from "./chat-animation";

const appearanceFunctionDictionary = {
  "chat-animation": {
    function: chatAnimation,
    isReady: true,
  },
};

export const appearance = () => {
  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        const dataset = change.target?.dataset.appearanceAnimation;
        if (appearanceFunctionDictionary[dataset]?.isReady) {
          appearanceFunctionDictionary[dataset].function();
          appearanceFunctionDictionary[dataset].isReady = false;
        }

        change.target.classList.add("element-show");
      }
    });
  }

  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".appearance-animation");
  
  for (let elm of elements) {
    observer.observe(elm);
  }
};
