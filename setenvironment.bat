@echo off
for /f "tokens=*" %%a in (.env) do (
  set %%a
)