import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IconService } from './icon.service';
import { Icon } from './entities/icon.entity';
import { CreateIconInput } from './dto/create-icon.input';
import { UpdateIconInput } from './dto/update-icon.input';

@Resolver(() => Icon)
export class IconResolver {
  constructor(private readonly iconService: IconService) {}

  @Mutation(() => Icon)
  createIcon(@Args('createIconInput') createIconInput: CreateIconInput) {
    return this.iconService.create(createIconInput);
  }

  @Query(() => [Icon], { name: 'icons' })
  findAll() {
    return this.iconService.findAll();
  }

  @Query(() => Icon, { name: 'icon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.iconService.findOne(id);
  }

  @Mutation(() => Icon)
  updateIcon(@Args('updateIconInput') updateIconInput: UpdateIconInput) {
    return this.iconService.update(updateIconInput.id, updateIconInput);
  }

  @Mutation(() => Icon)
  removeIcon(@Args('id', { type: () => Int }) id: number) {
    return this.iconService.remove(id);
  }
}
