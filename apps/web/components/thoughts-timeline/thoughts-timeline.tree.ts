// global modules
import * as R from 'ramda';

// local modules
import type {
  ThoughtSegmentResponseData,
  ThoughtSegmentResponseCollection,
} from '@repo/api-models/thought';

interface ThoughtTreeNode<TType extends ThoughtTreeNodeType, TChild> {
  type: TType;
  value: number;
  children: TChild;
}

export type ThoughtTreeNodeType = 'timestamp' | 'date' | 'month' | 'year';
type ThoughtTreeNodeParentType = Exclude<ThoughtTreeNodeType, 'timestamp'>;

export type Node<TType extends ThoughtTreeNodeType> = TType extends 'timestamp'
  ? ThoughtTreeNode<'timestamp', ThoughtSegmentResponseData>
  : TType extends 'date'
    ? ThoughtTreeNode<'date', Node<'timestamp'>[]>
    : TType extends 'month'
      ? ThoughtTreeNode<'month', Node<'date'>[]>
      : TType extends 'year'
        ? ThoughtTreeNode<'year', Node<'month'>[]>
        : never;

export type YearThoughtNode = Node<'year'>;
export type MonthThoughtNode = Node<'month'>;
export type DateThoughtNode = Node<'date'>;
export type TimestampThoughtNode = Node<'timestamp'>;
export type ThoughtTree = Node<'year'>[];

type ThoughtTreeNodeChildType<TType extends ThoughtTreeNodeParentType> =
  Node<TType>['children'][number]['type'];

const getChildType = <TType extends ThoughtTreeNodeParentType>(
  type: TType
): ThoughtTreeNodeChildType<TType> => {
  switch (type) {
    case 'year':
      return 'month';
    case 'month':
      return 'date';
    case 'date':
      return 'timestamp';
    default:
      throw new Error("Can't get child type");
  }
};

const getValue = (type: ThoughtTreeNodeType, responseData: ThoughtSegmentResponseData): number => {
  switch (type) {
    case 'year':
      return new Date(responseData.attributes.publishedAt).getFullYear();
    case 'month':
      return new Date(responseData.attributes.publishedAt).getMonth();
    case 'date':
      return new Date(responseData.attributes.publishedAt).getDate();
    case 'timestamp':
      return new Date(responseData.attributes.publishedAt).getTime();
  }
};

const addMissingThoughtTreeNode =
  <TNode extends Node<ThoughtTreeNodeType>>(
    type: TNode['type'],
    responseData: ThoughtSegmentResponseData
  ) =>
  (nodes: TNode[]): TNode[] => {
    const value = getValue(type, responseData);
    return !nodes.find((node) => node.value === value)
      ? [...nodes, { type, value, children: [] as TNode['children'] } as TNode]
      : nodes;
  };

const addNode =
  <TNode extends Node<ThoughtTreeNodeType>>(type: TNode['type']) =>
  (nodes: TNode[], responseData: ThoughtSegmentResponseData): TNode[] => {
    const value = getValue(type, responseData);

    return R.pipe(
      addMissingThoughtTreeNode<TNode>(type, responseData),
      R.map((node) =>
        node.value !== value
          ? node
          : ({
              value,
              type,
              children:
                node.type === 'timestamp'
                  ? responseData
                  : addNode(getChildType(node.type))(node.children, responseData),
            } as TNode)
      ),

      R.sortWith<TNode>([(a, b) => b.value - a.value])
    )(nodes);
  };

export const addTreeNodes = (tree: ThoughtTree, response: ThoughtSegmentResponseCollection) =>
  response.data.reduce(
    (accum, responseData) => addNode<Node<'year'>>('year')(accum, responseData),
    tree
  );
