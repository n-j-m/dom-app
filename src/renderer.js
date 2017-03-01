import { dist, patch, create } from 'virtual-dom';


export function createRenderer (mountEl) {
  if (typeof mountEl === 'function') {
    return mountEl;
  }

  let node = null, prevVNode = null;

  const createNode = (vNode) => {
    node = create(vNode);
    if (mountEl) {
      mountEl.innerHTML = '';
      mountEl.appendChild(node);
    }
    prevVNode = vNode;
    return node;
  };

  const updateNode = (vNode) => {
    const patches = diff(prevVNode, vNode);
    node = patch(node, patches);
    prevVNode = vNode;
    return node;
  };

  const renderer = (vNode) =>
    !node ? createNode(vNode) : updateNode(vNode);

  return renderer;
}
