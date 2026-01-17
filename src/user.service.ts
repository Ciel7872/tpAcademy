//Activity 5. Add a comment to a user.service.ts file 





//separate activity
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  name: string;

  @Column({ unique: true }) // UNIQUE in the db
  email: string;

  isActive: boolean;
}