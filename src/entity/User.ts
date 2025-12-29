import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    // ! -> tells “Trust me, it will be assigned.” after doing this error has been gone

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;
}
