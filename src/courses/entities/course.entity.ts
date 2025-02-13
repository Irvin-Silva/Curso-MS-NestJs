import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
@Entity()

export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable: false, unique: true, type: 'varchar'})
    title: string;
    @Column({nullable: true})   
    description: string;
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
}