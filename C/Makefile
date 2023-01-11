CLEANUP = rm -f

C_COMPILER=gcc
ifeq ($(shell uname -s), Darwin)
C_COMPILER=clang
endif

UNITY_ROOT=unity

TARGET=test.out

SRC_FILES=$(UNITY_ROOT)/src/unity.c $(UNITY_ROOT)/extras/memory/src/unity_memory.c $(UNITY_ROOT)/extras/fixture/src/unity_fixture.c  test/daynumber_tests.c test/test_runner.c test/all_tests.c src/daynumber.c

INC_DIRS=-Isrc -I$(UNITY_ROOT)/src -I$(UNITY_ROOT)/extras/fixture/src -I$(UNITY_ROOT)/extras/memory/src

all: clean default

rent: src/rent.c
	cc src/rent.c -o ../bin/rent
