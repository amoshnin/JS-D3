import { COLOR_WIDTH } from "../components/Circle"

export interface IColor {
  id: number
  start: string
  end: string
}

export const colors: Array<IColor> = [
  {
    id: 0,
    start: "#00E0D3",
    end: "#00B4D4",
  },
  {
    id: 1,
    start: "#00B4D4",
    end: "#409CAE",
  },
  {
    id: 2,
    start: "#66D8A4",
    end: "#409CAE",
  },
  {
    id: 3,
    start: "#FC727B",
    end: "#F468A0",
  },
  {
    id: 4,
    start: "#8289EA",
    end: "#7A6FC1",
  },
  {
    id: 5,
    start: "#FEC7A3",
    end: "#FD9F9C",
  },
]

export const snapPoints = colors.map((_, i) => -i * COLOR_WIDTH)
