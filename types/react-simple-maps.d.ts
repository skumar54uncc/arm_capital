declare module 'react-simple-maps' {
  import { ReactNode } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      scale?: number
      center?: [number, number]
      [key: string]: any
    }
    className?: string
    children?: ReactNode
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element

  export interface GeographiesProps {
    geography: string | object
    children: (props: {
      geographies: Array<{
        rsmKey: string
        properties: {
          NAME: string
          ISO_A3: string
          [key: string]: any
        }
        [key: string]: any
      }>
    }) => ReactNode
  }

  export function Geographies(props: GeographiesProps): JSX.Element

  export interface GeographyProps {
    geography: any
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    [key: string]: any
  }

  export function Geography(props: GeographyProps): JSX.Element

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
    [key: string]: any
  }

  export function Marker(props: MarkerProps): JSX.Element
}
