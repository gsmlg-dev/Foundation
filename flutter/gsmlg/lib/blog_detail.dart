import 'package:flutter/material.dart';
import 'models/blog.dart';
import 'components/default_app_bar.dart';
import 'components/banner_image.dart';
import 'package:url_launcher/url_launcher.dart';
import 'components/blog_tile.dart';
import 'styles.dart';

const BannerImageHeight = 300.0;
const BodyVerticalPadding = 20.0;
const FooterHeight = 100.0;

class BlogDetail extends StatefulWidget {
  final int blogID;

  BlogDetail(this.blogID);

  @override
  createState() => _BlogDetailState(this.blogID);
}

class _BlogDetailState extends State<BlogDetail> {
  final int blogID;
  Blog blog = Blog.blank();

  _BlogDetailState(this.blogID);

  @override
  void initState() {
    super.initState();
    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: DefaultAppBar(),
        body: Stack(children: [
          _renderBody(context, blog),
          _renderFooter(context, blog),
        ]));
  }

  loadData() async {
    final blog = await Blog.fetchByID(this.blogID);

    if (mounted) {
      setState(() {
        this.blog = blog;
      });
    }
  }

  Widget _renderBody(BuildContext context, Blog blog) {
    var result = <Widget>[];
    result.add(_renderHeader());
    return SingleChildScrollView(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: result));
  }

  Widget _renderHeader() {
    return Container(
        padding: EdgeInsets.symmetric(
            vertical: BodyVerticalPadding,
            horizontal: Styles.horizontalPaddingDefault),
        child: BlogTile(blog: this.blog, darkTheme: false));
  }

  Widget _renderFooter(BuildContext context, Blog blog) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.5)),
            height: FooterHeight,
            child: Container(
                padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 30.0),
                child: _renderBookButton()),
          )
        ]);
  }

  Widget _sectionTitle(String text) {
    return Container(
        padding: EdgeInsets.fromLTRB(Styles.horizontalPaddingDefault, 25.0,
            Styles.horizontalPaddingDefault, 0.0),
        child: Text(text.toUpperCase(),
            textAlign: TextAlign.left, style: Styles.headerLarge));
  }

  Widget _sectionText(String text) {
    return Container(
        padding: EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 15.0),
        child: Text(text, style: Styles.textDefault));
  }

  Widget _renderBookButton() {
    return FlatButton(
      color: Styles.accentColor,
      textColor: Styles.textColorBright,
      onPressed: _handleBookPress,
      child: Text('Book'.toUpperCase(), style: Styles.textCTAButton),
    );
  }

  void _handleBookPress() async {
    const url = 'mailto:me@example.com?subject=inquiry';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      print('Could not launch $url');
    }
  }
}
