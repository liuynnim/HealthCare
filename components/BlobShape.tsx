import Svg, { Ellipse } from "react-native-svg";

type Props = {
  height: number;
  width: number;
  rotate: string;
  rx: number;
  ry: number;
  top: number;
  right: number;
  cx?: number;
  cy?: number;
  opacity?: number;
};
export const BlobShape = (props: Props) => (
  <Svg height={props.height} width={props.width} style={{ position: "absolute", top: props.top, right: props.right, transform: [{ rotate: props.rotate }] }}>
    <Ellipse cx={props.cx || 80} cy={props.cy || 140} rx={props.rx} ry={props.ry} fill="#14B8A6" opacity={props.opacity || 0.25} />
  </Svg>
);
