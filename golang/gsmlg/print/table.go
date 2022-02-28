package print

import (
	"fmt"
	"reflect"
)

func Table(l []interface{}) {
	o := l[0]
	if o == nil {
		fmt.Println("")
		return
	}

	val := reflect.ValueOf(o)
	var scheme [][2]string
	for i := 0; i < val.Type().NumField(); i++ {
		nn := val.Type().Field(i).Name
		n := val.Type().Field(i).Tag.Get("json")
		if len(n) > 0 {
			scheme = append(scheme, [2]string{n, nn})
		}
	}

}
