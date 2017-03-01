import { h } from 'virtual-dom';
import flyd from 'flyd';

import { createRenderer } from './renderer';


function execComponent (component, context, children) {
  const vNode = component(context, children);
  if (context.state.hasOwnProperty('key')) {
    vNode.key = context.state.key;
  }
  return vNode;
}


export function createApp (RootComponent, reducer, mountEl, initialState) {
  const render = createRenderer(mountEl);

  const action$ = flyd.stream();

  const state$ = flyd.scan(reducer, initialState, action$);

  const ch = (selector, props, children) => {
    if (typeof selector === 'function') {
      return execComponent(selector, {
        state: props,
        action$,
        ch
      }, children);
    }

    return h(selector, props, children);
  };

  const off$ = flyd.on((state) => render(RootComponent({
    state,
    action$,
    ch
  })), state$);

  return {
    action$,
    state$,
    ch,
    off() { off$.end(); }
  };
}
