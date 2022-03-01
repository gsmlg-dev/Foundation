package print

import (
	"fmt"
	"reflect"
)

func Table(rl interface{}, titles []string) {
	value := reflect.ValueOf(rl)
	if value.Kind() != reflect.Slice {
		println("Not support")
		return
	}

	valueLen := value.Len()

	val := value.Index(0)

	var scheme [][2]string

	slen := val.Type().NumField()
	for i := 0; i < slen; i++ {
		name := val.Type().Field(i).Name
		tagName := val.Type().Field(i).Tag.Get("json")

		if len(tagName) > 0 && contains(titles, tagName) {
			scheme = append(scheme, [2]string{tagName, name})
		}
	}
	slen = len(scheme)

	table := make([][]string, valueLen+1)
	for i := 0; i < slen; i++ {
		table[0] = append(table[0], scheme[i][0])
	}

	maxLen := make([]int, len(scheme))
	for i := 0; i < slen; i++ {
		name := scheme[i][0]
		maxLen[i] = len(name)
	}
	for i := 0; i < valueLen; i++ {
		idx := i + 1
		line := value.Index(i)
		for ii := 0; ii < slen; ii++ {
			name := scheme[ii][1]
			val := line.FieldByName(name)
			var str string
			switch val.Kind() {
			case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
				str = fmt.Sprint(val.Int())
			case reflect.Float32, reflect.Float64:
				str = fmt.Sprint(val.Int())
			case reflect.Uint, reflect.Uintptr, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
				str = fmt.Sprint(val.Uint())
			default:
				str = val.String()
			}
			table[idx] = append(table[idx], str)
			l := len(str)
			if l > maxLen[ii] {
				maxLen[ii] = l
			}
		}
	}

	for _, line := range table {
		for i := 0; i < len(scheme); i++ {
			last := "\t"
			if i == len(scheme)-1 {
				last = ""
			}
			t := fmt.Sprintf("%%-%ds%s", maxLen[i], last)
			fmt.Printf(t, line[i])
		}
		fmt.Print("\n")
	}
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
