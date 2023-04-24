import { Static, Type } from '@sinclair/typebox'

export const TrainBody = Type.Object({
  input: Type.Object({
    instance_prompt: Type.String(),
    class_prompt: Type.String(),
    instance_data: Type.String(),
    max_train_steps: Type.Number(),
  }),
  model: Type.String(),
  trainer_version: Type.String(),
})

export type TrainBodyType = Static<typeof TrainBody>
