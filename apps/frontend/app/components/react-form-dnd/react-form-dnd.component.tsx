// globla modules
import { type ReactElement, useCallback, useId } from 'react';

import {
  DragDropContext,
  Draggable,
  type DraggableProvided,
  Droppable,
  type OnDragEndResponder,
} from 'react-beautiful-dnd';

import type {
  ArrayPath,
  Control,
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayReturn,
} from 'react-hook-form';

export interface ReactFormDreggableRenderProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
> extends DraggableProvided,
    UseFieldArrayReturn<TFieldValues, TName> {
  index: number;
  control: Control<TFieldValues>;
  field: FieldArrayWithId<TFieldValues, TName, 'id'>;
}

interface ReactFormDnDFieldProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
> {
  className?: string;
  control: Control<TFieldValues>;
  fieldArray: UseFieldArrayReturn<TFieldValues, TName, 'id'>;

  children(props: ReactFormDreggableRenderProps<TFieldValues, TName>): ReactElement<HTMLElement>;
}

export const ReactFormDnDField = <
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
>(
  props: ReactFormDnDFieldProps<TFieldValues, TName>,
) => {
  const { children, control, fieldArray, className } = props;

  const droppableId = useId();

  const onDragEnd: OnDragEndResponder = useCallback(
    result => {
      if (!result.destination) return;
      if (result.destination.index === result.source.index) return;

      const indexA = result.source.index;
      const indexB = result.destination.index;

      fieldArray.move(indexA, indexB);
    },
    [fieldArray.move],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {provided => (
          <div {...provided.droppableProps} className={className} ref={provided.innerRef}>
            {fieldArray.fields.map(field => {
              const index = fieldArray.fields.findIndex(({ id }) => id === field.id);

              return (
                <Draggable draggableId={field.id} index={index} key={field.id}>
                  {providedInner =>
                    children({ ...providedInner, ...fieldArray, control, field, index })
                  }
                </Draggable>
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
