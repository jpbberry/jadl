# Breaking Changes moving from discord-rose

- `CommandHandler` is no longer inside of discord-rose, you must use the new [@jadl/cmd](https://npmjs.com/@jadl/cmd) which is completely new and only for typescript. If you want to use the old command handler with jadl there is [@discord-rose/command-handler](https://trollface.dk/) however it will not be maintained

- `PermissionsUtils` has been renamed to `PermissionUtils`

- All permission operations (in bits and returns) have been converted to `bigint`s

- `Embed` has been removed in favor of `@jadl/embed`, which has some breaking changes as well

## Minor (deprecated -> removed)

- `usePrivateThreads`, `usePublicThreads`, and `useSlashCommands` have been removed

- `PermissionsUtils.calculate` has been removed