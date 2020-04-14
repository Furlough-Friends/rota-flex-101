# RotaFlex 101

## Linting

Optionally, one can set up the git pre-commit hook to run the linters locally before every commit
for maximum annoyance. The hook will only run if any *.java file has been modfied.

To do so go to the project root directory (one up from the location of this README) and symlink
 .githooks/pre-commit to .git/hooks/pre-commit.
 Make sure that the file is executable.
 
  This can be done with the following commands:
```
ln -s ../../.githooks/pre-commit .git/hooks
chmod +x .git/hooks/pre-commit
```

Alternatively, git could be set up to recognise the `.githooks` directory using:
```
git config --local core.hooksPath .githooks/
```