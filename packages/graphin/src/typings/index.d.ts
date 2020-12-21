export interface GraphinState {
  isReady: boolean;
}
export interface ITreeData {
  children: [];
}

interface UserProperties {
  [key: string]: any;
}

/** 基础节点类型 */
type BaseNode = {
  /** ID，必须为字符串*/
  id: string;
};

export interface RestNode {
  /** 注册元素的名称 */
  type: string;
  /**  用户的数据 */
  data: any;
  /** 坐标X */
  x: number;
  /** 坐标Y */
  y: number;
  /** 节点的样式，默认为默认样式 */
  style: Partial<NodeStyle>;
  /**  节点当前的状态 */
  status: NodeStatus[];
  /** 布局的相关信息 */
  layout: {};
}

/** 基础边类型 */
type BaseEdge = {
  /** 边的 Source */
  source: string;
  /** 边的 Target */
  target: string;
};

export interface RestEdge {
  /** 边的类型 */
  type?: string;
  /** 边的数据 */
  data: {};
  style: Partial<EdgeStyle>;
  layout: {
    /** 边的弹簧长度，力导时使用 */
    spring?: number;
  };
}

export enum NodeStatus {
  SELECTED = 'selected',
  ACTIVE = 'active',
}
/**
 * 节点的形状
 */
export enum NodeShape {
  CIRCLE = 'circle',
  RECT = 'rect',
}

export interface IGraphData {
  nodes: IUserNode[] | [];
  edges: IUserEdge[] | [];
  combos: Combo[] | [] | undefined | null;
  children?: any;
}
export interface ITreeData {
  id: string;
  children: Partial<ITreeData>[];
}

interface GraphinProps {
  /**
   * 本质是解构G6的options
   *
   * modes 代表的交互行为，转变为快捷配置，canvas相关的直接内置，节点交互相关的转移到组件层面
   * plugins 代表的组件，转变为graphin-components
   *
   */
  width?: number;
  height?: number;
  defaultNode?: Partial<NodeStyle> | any;
  defaultEdge?: Partial<EdgeStyle> | any;
  defaultCombo?: Partial<ComboStyle> | any;
  data: ITreeData | IGraphData;
  layout: Layout;
  options: {
    canvas: {
      drag: {
        enable: boolean;
      };
      brush: {
        enable: boolean;
        options: {};
      };
      zoom: {
        enable: boolean;
        zoomRang: [number, number];
        defaultValue: [number, number];
        wheelSensitivity: number;
      };
      fitview: {
        enable: boolean;
      };
      fitcenter: boolean;
    };
    node: {
      drag: {
        enable: boolean;
      };
      select: {
        enable: boolean;
      };
      hover: {
        enable: boolean;
      };
      highlight: {
        enable: boolean;
      };
      disable: {
        enable: boolean;
      };
    };
    edge: {
      /** 边没有拖拽 */
      select: {
        enable: boolean;
      };
      hover: {
        enable: boolean;
      };
      highlight: {
        enable: boolean;
      };
      disable: {
        enable: boolean;
      };
    };
    combo: {
      drag: boolean;
    };
  };

  // children: React.ReactChildren;
}

export interface IUserNode extends BaseNode, Partial<RestNode>, UserProperties {}
export interface GraphinNode extends BaseNode, RestNode, UserProperties {}

export interface EdgeStyle {
  /** 边的类型 */
  shape: 'line' | '';
  label: {
    value: string | number;
    position: '' | 'T';
    autoRote: boolean;
  };
  animation: {};
  /**
   * 自环
   *
   * @type {({
   *     position: string,
   *     dist: number,
   *   })}
   * @memberof Edge
   */
  loopCfg: {
    // 是否开启自环
    enable: boolean;
    position: string;
    dist: number;
  };
  /**
   * 多边
   *
   * @type {[number, number][]}
   * @memberof Edge
   */
  poly: {
    distance: number;
  };
}

export interface IUserEdge extends BaseEdge, Partial<RestEdge>, UserProperties {}
export interface GraphinEdge extends BaseEdge, RestEdge, UserProperties {}

export interface Combo {}

export interface NodeStyle {
  /** 节点的主要容器 */
  /** 节点的大小 */
  size: [number] | [number, number];
  /** 填充色 */
  fill: string;
  /** 包围边颜色 */
  stroke: string;

  /** 节点的文本 */
  label: {
    /** label的名称 */
    value: string;
    /** 展示位置 */
    position: 'top' | 'bottom' | 'left' | 'right';
    /** 文本填充色 */
    fill: string;
    /** 文本大小 */
    fontSize: number;
  };
  /** 节点的中间位置图标区域 */
  icon: {
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'font' | 'image' | 'text';
    /** 根据类型，填写对应的值 */
    value: string;
    /** 图标大小 */
    size: number;
    /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
    fill: string;
  };
  /** 节点的徽标 */
  badge: {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'LT' | 'RT' | 'RB' | 'LB';
    value: number | string;
    size: [number, number] | [number];
    /** 徽标填充色 */
    fill: string;
    /** 徽标内文本的颜色 */
    fontColor: string;
  };
  /**  节点的打标信息，例如 Pin,Locked */
  tag: {
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'font' | 'image' | 'text';
    /** 根据类型，填写对应的值 */
    value: string;
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'LT' | 'RT' | 'RB' | 'LB';
    /** 填充的颜色 */
    fill: string;
  };
  status: {
    /** 状态的类型 */
    type: 'shadow' | 'border';
    hover: {};
    selected: {};
    highlight: {};
    disable: {};
  };
}

export interface ComboStyle {}

export interface Layout {
  /** 布局名称，必选 */
  type: string;
  /** 布局配置，可选 */
  [key: string]: any; // eslint-disable-line
}

export interface IconLoader {
  (): {
    fontFamily: string;
    map: {}[];
  }[];
}

declare global {
  /** Graphin2.0 */
  namespace IGraphin {
    type Props = GraphinProps;
    type State = GraphinState;
    type UserNode = IUserNode;
    type UserEdge = IUserEdge;
    type GraphData = IGraphData;
    type TreeData = ITreeData;
  }
}
