import { init } from '../helper/runtime'
import {
  getScopeIds,
  getScopeStyle,
  getComponentStyle,
  getSize
} from '../../../../render/vue/core/style'
import div from '../../../../render/vue/components/div'
import image from '../../../../render/vue/components/image'
import { init as initViewport, resetViewport } from '../../../../render/vue/env/viewport'

import scopedStyleBundle from '../data/build/dotvue/scoped-style'

init('core style', (Vue, helper) => {
  const { compile, utils } = helper
  const { scale } = initViewport()

  before(() => {
    helper.register('div', div)
    helper.register('image', image)
  })

  it('should get normalized merged styles.', function () {
    const vm = helper.createVm(scopedStyleBundle)
    const el = vm.$refs.foo.$el
    expect(el).to.be.ok

    const expectedMap = {
      width: 200 * scale + 'px',
      height: 200 * scale + 'px',
      backgroundColor: 'red'
    }
    const expectedDirection = {
      WebkitBoxDirection: 'normal',
      WebkitBoxOrient: 'horizontal',
      WebkitFlexDirection: 'row',
      flexDirection: 'row'
    }
    const expectedTransform = {
      WebkitTransform: `translate3d(${100 * scale + 'px'}, ${100 * scale + 'px'}, 0px)`,
      transform: `translate3d(${100 * scale + 'px'}, ${100 * scale + 'px'}, 0px)`
    }

   for (const k in expectedMap) {
    expect(el.style[k]).to.equal(expectedMap[k])
   }
   const directionRes = []
   for (const k in expectedDirection) {
    directionRes.push(el.style[k] === expectedDirection[k])
   }
   expect(directionRes).to.include(true)

   const transformRes = []
   for (const k in expectedTransform) {
    transformRes.push(el.style[k] === expectedTransform[k])
   }
   expect(transformRes).to.include(true)
  })
})
