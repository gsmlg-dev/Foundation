// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'blog.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Blog _$BlogFromJson(Map<String, dynamic> json) => Blog(
      id: json['id'] as int,
      slug: json['slug'] as String,
      title: json['title'] as String,
      author: json['author'] as String,
      content: json['content'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$BlogToJson(Blog instance) => <String, dynamic>{
      'id': instance.id,
      'slug': instance.slug,
      'title': instance.title,
      'author': instance.author,
      'content': instance.content,
      'date': instance.date,
    };
