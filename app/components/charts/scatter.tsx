import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface ScatterProps{
  data: Array{}
}

export default function Scatter(props){
  const headerRef=useRef()
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv("/gistemp.csv", d3.autoType).then(setData);
  }, []);
}
