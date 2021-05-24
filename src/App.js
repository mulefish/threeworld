import React, { useMemo } from 'react'
import { Canvas } from 'react-three-fiber'
import SpriteText from 'three-spritetext';


function Text({ children, position, scale, color = 'white', fontSize = 45 }) {
  const canvas = useMemo(() => {
    var fontface = 'Arial'
    var fontsize = fontSize
    var borderThickness = 4

    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    context.textBaseline = 'middle'
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`

    var metrics = context.measureText(children)
    console.log(metrics)
    var textWidth = metrics.width

    context.lineWidth = borderThickness

    context.fillStyle = color
    context.fillText(children, textWidth - textWidth * 0.8, fontsize)
    return canvas
  }, [children])

  return (
    <sprite scale={scale} position={position}>
      <spriteMaterial sizeAttenuation={false} attach="material" transparent alphaTest={0.5}>
        <canvasTexture attach="map" image={canvas} />
      </spriteMaterial>
    </sprite>
  )
}

export default function App() {
  return (
    <Canvas orthographic camera={{ zoom: 20, position: [28, 22, 26] }} colorManagement={false}>
      <color attach="background" args={['black']} />
      <Text scale={[4, 4, 4]} opacity={1} position={[0, 0, 0]}>
        TEXT
      </Text>
    </Canvas>
  )
}
