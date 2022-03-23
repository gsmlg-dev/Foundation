import 'package:json_annotation/json_annotation.dart';
import 'package:http/http.dart' as http;
import '../endpoint.dart';
import 'dart:convert';

part 'blog.g.dart';

@JsonSerializable(fieldRename: FieldRename.snake)
class Blog {
  final int id;
  final String slug;
  final String title;
  final String author;
  final String content;
  final String date;

  Blog(
      {required this.id,
      required this.slug,
      required this.title,
      required this.author,
      required this.content,
      required this.date});

  Blog.blank()
      : id = 0,
        slug = '',
        title = '',
        author = '',
        content = '',
        date = '';

  factory Blog.fromJson(Map<String, dynamic> json) =>
      _$BlogFromJson(json);

  static Future<List<Blog>> fetchAll() async {
    var uri = Endpoint.uri('/blogs', queryParameters: {});

    final resp = await http.get(uri);

    if (resp.statusCode != 200) {
      throw (resp.body);
    }
    List<Blog> list = <Blog>[];
    for (var jsonItem in json.decode(resp.body)) {
      list.add(Blog.fromJson(jsonItem));
    }
    return list;
  }

  static Future<Blog> fetchByID(int id) async {
    var uri = Endpoint.uri('/blogs/$id', queryParameters: {});

    final resp = await http.get(uri);

    if (resp.statusCode != 200) {
      throw (resp.body);
    }
    final Map<String, dynamic> itemMap = json.decode(resp.body);
    return Blog.fromJson(itemMap);
  }
}
