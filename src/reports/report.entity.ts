import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: string;
}
