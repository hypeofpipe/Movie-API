import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Movie } from "./Movie"

@Entity()
export class Comments {
  @PrimaryGeneratedColumn() id!: number

  @Column() author!: string

  @ManyToOne(type => Movie)
  movie!: Movie

  @Column() content!: string
}
