package print

import (
	"fmt"
	"os"
)

func Error(e interface{}) (n int, err error) {
	return fmt.Fprint(os.Stderr, e)
}

func Errorf(s string, e interface{}) (n int, err error) {
	return fmt.Fprintf(os.Stderr, s, e)
}

func Errorln(e interface{}) (n int, err error) {
	return fmt.Fprintln(os.Stderr, e)
}
