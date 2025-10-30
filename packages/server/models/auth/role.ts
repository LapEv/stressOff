import { Model, Schema, model } from 'mongoose'

export interface IRole {
  value: string
}

export type RoleModel = Model<IRole>

const Roles = new Schema<IRole, RoleModel>({
  value: { type: String, unique: true, default: 'USER' },
})

export const Role = model<IRole, RoleModel>('role', Roles)
